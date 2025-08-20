import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Receipt, AdminProfile, Language } from '../types';
import { SOCIETY_DETAILS, TRANSLATIONS } from '../constants';

// Define an interface extending jsPDF to include properties from the autoTable plugin.
// This approach is used to fix a TypeScript module augmentation error where the 'jspdf' module could not be found.
// By using a local interface and type assertion, we avoid environment-specific module resolution issues.
interface jsPDFWithAutoTable extends jsPDF {
    autoTable: (options: any) => jsPDFWithAutoTable;
    lastAutoTable: { finalY: number };
}


/**
 * NOTE on PDF Font Support:
 * jsPDF has limited built-in support for Unicode characters, especially for non-Latin scripts
 * like Gujarati and Devanagari. For proper rendering, custom fonts must be embedded into the PDF.
 * This process is complex and requires loading the font file (e.g., .ttf) as base64 data,
 * which is too large to include directly in this single-file generation context.
 * The following implementation will work best for English and may show incorrect characters
 * for other languages. A production-grade solution would use a library like `pdf-lib` and
 * fetch/embed font files.
 */
export const exportReceiptToPdf = (receipt: Receipt, profile: AdminProfile) => {
  const doc = new jsPDF() as jsPDFWithAutoTable;
  const lang = receipt.language;
  const t = (key: string) => TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key];
  const societyInfo = SOCIETY_DETAILS[lang];

  // Set font based on language, with English as fallback
  const fontName = lang === 'gu' ? 'NotoSansGujarati' : lang === 'hi' ? 'NotoSansDevanagari' : 'Helvetica';
  try {
    doc.setFont(fontName);
  } catch(e) {
    console.warn(`Font ${fontName} not available in jsPDF, falling back to Helvetica.`);
    doc.setFont('Helvetica');
  }

  // Header
  doc.setFontSize(16);
  doc.text(societyInfo.title, doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.text(societyInfo.subtitle, doc.internal.pageSize.getWidth() / 2, 28, { align: 'center' });
  doc.text(societyInfo.address, doc.internal.pageSize.getWidth() / 2, 36, { align: 'center' });
  doc.text(societyInfo.regNo, doc.internal.pageSize.getWidth() / 2, 44, { align: 'center' });

  doc.setLineWidth(0.5);
  doc.line(20, 50, 190, 50);

  // Receipt Details
  doc.setFontSize(14);
  doc.text(`${t('receiptNumber')}: ${receipt.receiptNumber}`, 20, 60);
  doc.text(`${t('date')}: ${receipt.date}`, 180, 60, { align: 'right' });

  doc.autoTable({
    startY: 70,
    head: [[t('name'), t('amount')]],
    body: [[receipt.name, receipt.amount.toFixed(2)]],
    theme: 'grid',
    styles: { font: fontName },
    headStyles: { fillColor: [75, 85, 99] } // gray-600
  });

  const finalY = doc.lastAutoTable.finalY;

  // Total
  doc.setFontSize(12);
  doc.setFont('Helvetica', 'bold');
  doc.text(`${t('total')}: ${receipt.amount.toFixed(2)}`, 180, finalY + 10, { align: 'right' });
  doc.setFont('Helvetica', 'normal');

  // Signature
  if (profile.signature) {
    doc.addImage(profile.signature, 'PNG', 20, finalY + 20, 50, 20);
    doc.text(profile.name, 20, finalY + 45);
  } else {
     doc.text('_________________________', 20, finalY + 30);
     doc.text(t('signature'), 20, finalY + 38);
  }


  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150);
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.text(t('digitalCopyNotice'), doc.internal.pageSize.getWidth() / 2, footerY, { align: 'center' });
  doc.text(t('createdBy'), doc.internal.pageSize.getWidth() / 2, footerY + 5, { align: 'center' });


  doc.save(`Receipt_${receipt.receiptNumber}.pdf`);
};

export const exportToXlsx = (receipts: Receipt[], lang: Language) => {
  const t = (key: string) => TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key];
  
  const data = receipts.map(r => ({
    [t('receiptNumber')]: r.receiptNumber,
    [t('name')]: r.name,
    [t('date')]: r.date,
    [t('amount')]: r.amount
  }));

  const totalAmount = receipts.reduce((sum, r) => sum + r.amount, 0);
  data.push({
    [t('receiptNumber')]: '',
    [t('name')]: '',
    [t('date')]: t('total'),
    [t('amount')]: totalAmount
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, t('receipts'));

  XLSX.writeFile(workbook, `${t('receipts')}.xlsx`);
};