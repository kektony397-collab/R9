
import React, { useRef, useContext } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from './ui';
import { AppContext } from '../contexts/AppContext';

interface SignaturePadProps {
  onSave: (signature: string) => void;
  initialDataURL?: string | null;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, initialDataURL }) => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const { t } = useContext(AppContext);

  const clear = () => {
    sigCanvas.current?.clear();
  };

  const save = () => {
    if (sigCanvas.current?.isEmpty()) {
      onSave('');
      return;
    }
    const dataUrl = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png') || '';
    onSave(dataUrl);
  };

  React.useEffect(() => {
    if(initialDataURL && sigCanvas.current) {
        sigCanvas.current.fromDataURL(initialDataURL);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialDataURL]);


  return (
    <div className="w-full">
      <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
        <SignatureCanvas
          ref={sigCanvas}
          penColor='black'
          canvasProps={{ className: 'w-full h-48 bg-gray-50 dark:bg-gray-700' }}
        />
      </div>
      <div className="flex justify-end mt-2 space-x-2">
        <Button type="button" variant="outlined" onClick={clear}>{t('clear')}</Button>
        <Button type="button" onClick={save}>{t('saveSignature')}</Button>
      </div>
    </div>
  );
};

export default SignaturePad;
