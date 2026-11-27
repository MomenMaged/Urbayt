
import { Divider, Grid, Image, Modal } from 'antd';

interface ImageModalProps {
  open: boolean;
  onClose: () => void;
}

const ViewPhotos: React.FC<ImageModalProps> = ({open ,onClose}) => {
  
    const { useBreakpoint } = Grid;

  const screens = useBreakpoint();

  return (
    <>
     
      <Modal
      footer={false}
        width={screens.lg || screens.md ? '60%' : '90%'}
        open={open}
        onCancel={onClose}
        onOk={onClose}
        afterOpenChange={(visible) => console.log('Modal open:', visible)}
      >
        {/* First group of images */}
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
          
        >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '16px',
            padding:'2%'
          }}
        >
          <Image
            width={'30%'}
            src="/AS-URBAN-HIVE-MADINATY-1.jpg"
          />
          <Image
            width={'30%'}
            src="/AS-URBAN-HIVE-MADINATY-2.jpg"
          />
          <Image
            width={'30%'}
            src="/AS-URBAN-HIVE-MADINATY-4.jpg"
          />
        </div>
        

        <Divider />

        {/* Preview group in a similar layout */}
        
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              padding:'2%'
            }}
          >
            <Image
              width={'30%'}
              src="/AS-URBAN-HIVE-MADINATY-5.jpg"
            />
            <Image
              width={'30%'}
              src="/AS-URBAN-HIVE-MADINATY-10.jpg"
            />
            <Image
              width={'30%'}
              src="/AS-URBAN-HIVE-MADINATY-7.jpg"
            />
          </div>
        </Image.PreviewGroup>
      </Modal>
    </>
  );
};

export default ViewPhotos;
