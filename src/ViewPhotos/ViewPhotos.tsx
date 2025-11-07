
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
        width={screens.lg || screens.md ? '50%' : '90%'}
        open={open}
        onCancel={onClose}
        onOk={onClose}
        afterOpenChange={(visible) => console.log('Modal open:', visible)}
      >
        {/* First group of images */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '16px',
          }}
        >
          <Image
            width={'30%'}
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          />
          <Image
            width={'30%'}
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          />
          <Image
            width={'30%'}
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          />
        </div>

        <Divider />

        {/* Preview group in a similar layout */}
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
            }}
          >
            <Image
              width={'30%'}
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
            <Image
              width={'30%'}
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            />
            <Image
              width={'30%'}
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            />
          </div>
        </Image.PreviewGroup>
      </Modal>
    </>
  );
};

export default ViewPhotos;
