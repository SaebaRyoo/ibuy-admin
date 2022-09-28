import React, { useEffect, useState } from 'react';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Button, Checkbox } from 'antd';
import { history } from 'umi';
import styles from './AlbumDetails.less';
import { FooterToolbar } from '@ant-design/pro-components';
import UploadModal from './UploadModal';
import TransferModal from './TransferModal';
const sleep = (delay: number | undefined) => new Promise((resolve) => setTimeout(resolve, delay));

type StateParam = {
  images: string;
};

const Remove_Operate = 'remove';
const Transfer_Operate = 'transfer';

const AlbumDetails: React.FC = () => {
  const [selectedImgs, setSelectKeys] = useState<string[]>([]);
  const [imgArr, setImgArr] = useState<string[]>([]);
  const [openParam, setOpenParam] = useState<OpenParam>({ open: false });
  const [transferModal, setTransferModal] = useState<OpenParam>({ open: false });

  useEffect(() => {
    const { images } = history.location.state as StateParam;
    // 初始化受控数据
    const imgs = images ? images.split(',') : [];
    setImgArr(imgs);
  }, []);

  console.log(selectedImgs);
  const handleChecked = (img: string) => {
    setSelectKeys((prev) => {
      const old: string[] = [...prev];

      const index = old.indexOf(img);
      if (index >= 0) {
        // 有元素，删除
        old.splice(index, 1);
      } else {
        // 没有元素，需要push进去
        old.push(img);
      }
      return old;
    });
  };

  const handleOperation = async (operate: string, img: string) => {
    const imgArrCopy = [...imgArr];
    const i = imgArrCopy.indexOf(img);
    if (i >= 0) {
      imgArrCopy.splice(i, 1);
    }

    // 删除
    if (operate === Remove_Operate) {
      // 1-remove. 批量删除接口请求
      await sleep(1000);
      console.log('删除成功');
    }

    // 转移
    if (operate === Remove_Operate) {
      // 1-transfer. 批量转移接口请求
      await sleep(1000);
      console.log('转移成功');
    }

    setImgArr(imgArrCopy);
  };

  /**
   * 批量操作图片
   * @param selectedImgs
   */
  const handleGroupOperation = async (operate: string, selectedImgs: string[]) => {
    const imgArrCopy = [...imgArr];
    selectedImgs.forEach((img) => {
      const i = imgArrCopy.indexOf(img);
      if (i >= 0) {
        imgArrCopy.splice(i, 1);
      }
    });

    // 批量删除
    if (operate === Remove_Operate) {
      // 1-remove. 批量删除接口请求
      await sleep(1000);
      console.log('批量删除成功');
    }

    // 批量转移
    if (operate === Remove_Operate) {
      // 1-transfer. 批量转移接口请求
      await sleep(1000);
      console.log('批量转移成功');
    }
    // 2. 如果成功后替换数组
    setImgArr(imgArrCopy);
  };

  const handleConfirm = (value: any) => {
    setOpenParam({
      open: false,
    });
    console.log(value);
  };

  const handleCancel = () => {
    setOpenParam({
      open: false,
    });
  };

  const handleTransferModalConfirm = (value: any) => {
    handleOperation(Transfer_Operate, '');
    setTransferModal({
      open: false,
    });
    console.log(value);
  };

  const handleTransferModalCancel = () => {
    setTransferModal({
      open: false,
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>图片列表</span>

        <div>
          <Button style={{ marginRight: 20 }} onClick={() => history.replace('/goods/album')}>
            返回相册列表
          </Button>
          <Button onClick={() => setOpenParam({ open: true })} type="primary">
            上传图片
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        {imgArr.map((img: string) => (
          <div key={img}>
            <img
              alt="img"
              src={img}
              onError={(e: any) => {
                e.target.src = '/icons/icon-128x128.png';
              }}
            />
            <div>
              <Checkbox
                checked={selectedImgs.includes(img)}
                onChange={(e: CheckboxChangeEvent) => handleChecked(img)}
              />
              <a onClick={() => setTransferModal({ open: true })}>转移相册</a>
              <a>删除相片</a>
            </div>
          </div>
        ))}
      </div>

      {selectedImgs?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择
              <a style={{ fontWeight: 600 }}>{selectedImgs.length}</a> 个图片进行操作
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleGroupOperation(Remove_Operate, selectedImgs);
              setSelectKeys([]);
            }}
          >
            批量转移
          </Button>
          <Button
            onClick={async () => {
              await handleGroupOperation(Transfer_Operate, selectedImgs);
              setSelectKeys([]);
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}

      <UploadModal
        openParam={openParam}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
      <TransferModal
        openParam={transferModal}
        handleConfirm={handleTransferModalConfirm}
        handleCancel={handleTransferModalCancel}
      />
    </div>
  );
};

export default AlbumDetails;
