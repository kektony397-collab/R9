
import { Language } from './types';

export const APP_COLORS = {
  primary: '#6750A4', // Material Design 3 Primary
  onPrimary: '#FFFFFF',
  primaryContainer: '#EADDFF',
  onPrimaryContainer: '#21005D',
  secondary: '#625B71',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#E8DEF8',
  onSecondaryContainer: '#1D192B',
  tertiary: '#7D5260',
  error: '#B3261E',
  background: '#FFFBFE',
  onBackground: '#1C1B1F',
  surface: '#FFFBFE',
  onSurface: '#1C1B1F',
  surfaceVariant: '#E7E0EC',
  onSurfaceVariant: '#49454F',
  outline: '#79747E',
};

export const SOCIETY_DETAILS: Record<Language, { title: string; subtitle: string; address: string; regNo: string; }> = {
  en: {
    title: 'Demo Apartment Division',
    subtitle: 'Co-op. Housing Service Society Ltd.',
    address: 'Demo Address',
    regNo: 'REG.NO Demo'
  },
  gu: {
    title: 'ડેમો એપાર્ટમેન્ટ વિભાગ',
    subtitle: 'કો.ઓપ. હાઉસિંગ સર્વિસ સોસાયટી લિ.',
    address: 'ડેમો address',
    regNo: 'REG.NO ડેમો'
  },
  hi: {
    title: 'डेमो अपार्टमेंट विभाग',
    subtitle: 'को.ऑप. हाउसिंग सर्विस सोसाइटी लि.',
    address: 'डेमो पता',
    regNo: 'REG.NO डेमो'
  }
};

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // General
    'appName': 'Receipt Book',
    'dashboard': 'Dashboard',
    'receipts': 'Receipts',
    'expenses': 'Expenses',
    'profile': 'Profile',
    'settings': 'Settings',
    'logout': 'Logout',
    'save': 'Save',
    'saved': 'Saved!',
    'saving': 'Saving...',
    'error': 'An error occurred.',
    'language': 'Language',
    'english': 'English',
    'gujarati': 'Gujarati',
    'hindi': 'Hindi',
    'total': 'Total',
    'name': 'Name',
    'date': 'Date',
    'amount': 'Amount',
    'operation': 'Operation',
    'plus': 'Plus',
    'minus': 'Minus',
    'actions': 'Actions',
    'search': 'Search...',
    'createdBy': 'Created By Yash K Pathak',
    'digitalCopyNotice': 'This is only a digital soft copy',

    // Login
    'loginTitle': 'Admin Login',
    'username': 'Username',
    'password': 'Password',
    'login': 'Login',
    'invalidCredentials': 'Invalid username or password',

    // Dashboard
    'welcome': 'Welcome',
    'totalReceipts': 'Total Receipts',
    'totalAmount': 'Total Amount Collected',
    'recentActivity': 'Recent Activity',
    'quickActions': 'Quick Actions',
    'newReceipt': 'New Receipt',
    'newExpense': 'New Expense',

    // Receipts
    'receiptManagement': 'Receipt Management',
    'createReceipt': 'Create Receipt',
    'receiptNumber': 'Receipt No.',
    'generateReceipt': 'Generate & Save Receipt',
    'receiptList': 'Receipt List',
    'exportAllToExcel': 'Export All to Excel',
    'exportToPdf': 'Export to PDF',

    // Expenses
    'expenseCalculator': 'Expense Calculator',
    'addExpense': 'Add Expense',
    'expenseList': 'Expense List',
    'runningTotal': 'Running Total',
    
    // Profile
    'adminProfile': 'Admin Profile',
    'fullName': 'Full Name',
    'blockNumber': 'Block/Flat Number',
    'signature': 'Signature',
    'drawSignature': 'Draw Signature',
    'clear': 'Clear',
    'saveSignature': 'Save Signature',
    'changePassword': 'Change Password',
    'newPassword': 'New Password',
    'confirmPassword': 'Confirm New Password',
    'updatePassword': 'Update Password',
    'passwordsDoNotMatch': 'Passwords do not match.',
    'passwordUpdated': 'Password updated successfully.',
  },
  gu: {
    // General
    'appName': 'રસીદ બુક',
    'dashboard': 'ડેશબોર્ડ',
    'receipts': 'રસીદો',
    'expenses': 'ખર્ચ',
    'profile': 'પ્રોફાઇલ',
    'settings': 'સેટિંગ્સ',
    'logout': 'લૉગઆઉટ',
    'save': 'સાચવો',
    'saved': 'સાચવ્યું!',
    'saving': 'સાચવી રહ્યું છે...',
    'error': 'એક ભૂલ આવી.',
    'language': 'ભાષા',
    'english': 'અંગ્રેજી',
    'gujarati': 'ગુજરાતી',
    'hindi': 'હિન્દી',
    'total': 'કુલ',
    'name': 'નામ',
    'date': 'તારીખ',
    'amount': 'રકમ',
    'operation': 'ઓપરેશન',
    'plus': 'સરવાળો',
    'minus': 'બાદબાકી',
    'actions': 'ક્રિયાઓ',
    'search': 'શોધો...',
    'createdBy': 'યશ કે પાઠક દ્વારા બનાવેલ છે',
    'digitalCopyNotice': 'આ ફક્ત ડિજિટલ સોફ્ટ કોપી છે',
    
    // Login
    'loginTitle': 'એડમિન લોગિન',
    'username': 'વપરાશકર્તા નામ',
    'password': 'પાસવર્ડ',
    'login': 'લોગિન કરો',
    'invalidCredentials': 'અમાન્ય વપરાશકર્તા નામ અથવા પાસવર્ડ',

    // Dashboard
    'welcome': 'સ્વાગત છે',
    'totalReceipts': 'કુલ રસીદો',
    'totalAmount': 'એકત્રિત કુલ રકમ',
    'recentActivity': 'તાજેતરની પ્રવૃત્તિ',
    'quickActions': 'ઝડપી ક્રિયાઓ',
    'newReceipt': 'નવી રસીદ',
    'newExpense': 'નવો ખર્ચ',

    // Receipts
    'receiptManagement': 'રસીદ સંચાલન',
    'createReceipt': 'રસીદ બનાવો',
    'receiptNumber': 'રસીદ નં.',
    'generateReceipt': 'રસીદ બનાવો અને સાચવો',
    'receiptList': 'રસીદ યાદી',
    'exportAllToExcel': 'બધી એક્સેલમાં નિકાસ કરો',
    'exportToPdf': 'PDF માં નિકાસ કરો',
    
    // Expenses
    'expenseCalculator': 'ખર્ચ કેલ્ક્યુલેટર',
    'addExpense': 'ખર્ચ ઉમેરો',
    'expenseList': 'ખર્ચ યાદી',
    'runningTotal': 'ચાલુ કુલ',
    
    // Profile
    'adminProfile': 'એડમિન પ્રોફાઇલ',
    'fullName': 'પૂરું નામ',
    'blockNumber': 'બ્લોક/ફ્લેટ નંબર',
    'signature': 'સહી',
    'drawSignature': 'સહી દોરો',
    'clear': 'સાફ કરો',
    'saveSignature': 'સહી સાચવો',
    'changePassword': 'પાસવર્ડ બદલો',
    'newPassword': 'નવો પાસવર્ડ',
    'confirmPassword': 'નવો પાસવર્ડ ખાતરી કરો',
    'updatePassword': 'પાસવર્ડ અપડેટ કરો',
    'passwordsDoNotMatch': 'પાસવર્ડ મેળ ખાતા નથી.',
    'passwordUpdated': 'પાસવર્ડ સફળતાપૂર્વક અપડેટ થયો.',
  },
  hi: {
    // General
    'appName': 'रसीद बुक',
    'dashboard': 'डैशबोर्ड',
    'receipts': 'रसीदें',
    'expenses': 'खर्च',
    'profile': 'प्रोफ़ाइल',
    'settings': 'सेटिंग्स',
    'logout': 'लॉगआउट',
    'save': 'सहेजें',
    'saved': 'सहेजा गया!',
    'saving': 'सहेज रहा है...',
    'error': 'एक त्रुटि हुई।',
    'language': 'भाषा',
    'english': 'अंग्रेज़ी',
    'gujarati': 'गुजराती',
    'hindi': 'हिंदी',
    'total': 'कुल',
    'name': 'नाम',
    'date': 'तारीख',
    'amount': 'राशि',
    'operation': 'ऑपरेशन',
    'plus': 'जोड़',
    'minus': 'घटा',
    'actions': 'कार्रवाई',
    'search': 'खोजें...',
    'createdBy': 'यश के पाठक द्वारा बनाया गया',
    'digitalCopyNotice': 'यह केवल एक डिजिटल सॉफ्ट कॉपी है',
    
    // Login
    'loginTitle': 'एडमिन लॉगइन',
    'username': 'उपयोगकर्ता नाम',
    'password': 'पासवर्ड',
    'login': 'लॉग इन करें',
    'invalidCredentials': 'अमान्य उपयोगकर्ता नाम या पासवर्ड',

    // Dashboard
    'welcome': 'स्वागत है',
    'totalReceipts': 'कुल रसीदें',
    'totalAmount': 'कुल एकत्रित राशि',
    'recentActivity': 'हाल की गतिविधि',
    'quickActions': 'त्वरित कार्रवाई',
    'newReceipt': 'नई रसीद',
    'newExpense': 'नया खर्च',

    // Receipts
    'receiptManagement': 'रसीद प्रबंधन',
    'createReceipt': 'रसीद बनाएं',
    'receiptNumber': 'रसीद संख्या',
    'generateReceipt': 'रसीद बनाएं और सहेजें',
    'receiptList': 'रसीद सूची',
    'exportAllToExcel': 'सभी को एक्सेल में निर्यात करें',
    'exportToPdf': 'पीडीएफ में निर्यात करें',

    // Expenses
    'expenseCalculator': 'व्यय कैलकुलेटर',
    'addExpense': 'व्यय जोड़ें',
    'expenseList': 'व्यय सूची',
    'runningTotal': 'चालू कुल',
    
    // Profile
    'adminProfile': 'एडमिन प्रोफ़ाइल',
    'fullName': 'पूरा नाम',
    'blockNumber': 'ब्लॉक/फ्लैट नंबर',
    'signature': 'हस्ताक्षर',
    'drawSignature': 'हस्ताक्षर बनाएं',
    'clear': 'साफ़ करें',
    'saveSignature': 'हस्ताक्षर सहेजें',
    'changePassword': 'पासवर्ड बदलें',
    'newPassword': 'नया पासवर्ड',
    'confirmPassword': 'नए पासवर्ड की पुष्टि करें',
    'updatePassword': 'पासवर्ड अपडेट करें',
    'passwordsDoNotMatch': 'पासवर्ड मेल नहीं खाते।',
    'passwordUpdated': 'पासवर्ड सफलतापूर्वक अपडेट किया गया।',
  }
};
