import { editAlbum, findALlAlbums } from '@/services/ibuy/goods/album';
import { uuid } from '@/utils/common/uuid';
import { FooterToolbar } from '@ant-design/pro-components';
import { Button, Checkbox, message, Modal } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { history } from 'umi';
import styles from './AlbumDetails.less';
import TransferModal from './TransferModal';
import UploadModal from './UploadModal';

// const sleep = (delay: number | undefined) => new Promise((resolve) => setTimeout(resolve, delay));

type StateParam = {
  record: API.Album;
};

const Remove_Operate = 'remove';
const Transfer_Operate = 'transfer';

type Img = {
  uid: string;
  url: string;
  status: boolean;
};

const AlbumDetails: React.FC = () => {
  const [selectedImgs, setSelectKeys] = useState<string[]>([]);
  const [imgArr, setImgArr] = useState<Img[]>([]);
  const [openParam, setOpenParam] = useState<ModalProps>({ open: false });
  const [transferModal, setTransferModal] = useState<ModalProps>({ open: false });
  const [albumList, setAlbumList] = useState<API.Album[]>([]);
  const [id, setId] = useState<number>(-1);
  const [modal, contextHolder] = Modal.useModal();

  // console.log('albumList----->', albumList);
  // console.log('selectedImgs----->', selectedImgs);
  // console.log('imgArr----->', imgArr);

  useEffect(() => {
    (async () => {
      const { data = [] } = await findALlAlbums();
      setAlbumList(data);
    })();
  }, []);

  useLayoutEffect(() => {
    const { record } = history.location.state as StateParam;
    const { imageItems = '', id } = record;
    // 初始化受控数据
    const imgs: Img[] = imageItems ? JSON.parse(imageItems) : [];
    setImgArr(imgs);
    setId(id);
  }, []);

  const handleChecked = (uid: string) => {
    setSelectKeys((prev) => {
      const old: string[] = [...prev];
      let flag = false;
      old.forEach((prevId, i) => {
        if (prevId === uid) {
          flag = true;
          old.splice(i, 1);
        }
      });

      if (!flag) {
        old.push(uid);
      }
      return old;
    });
  };

  /**
   * 批量操作图片
   * @param selectedImgs
   */
  const handleOperation = async (
    operate: string, // 什么操作
    selectedImgs: string[], // 当前需要操作的图片的uid的list
    albumName?: string, // 相册名称，只在转移相册时传入
  ) => {
    const imgArrCopy = [...imgArr];
    selectedImgs.forEach((uid) => {
      imgArrCopy.forEach((img, i) => {
        if (img.uid === uid) {
          imgArrCopy.splice(i, 1);
        }
      });
    });

    console.log('imgArrCopy----->', imgArrCopy);
    // 批量删除
    if (operate === Remove_Operate) {
      // 1-remove. 批量删除接口请求
      const { success } = await editAlbum({ id: id, imageItems: JSON.stringify(imgArrCopy) });
      if (success) {
        message.success('删除成功');
      } else {
        message.error('删除失败');
      }
    }

    // TODO: 批量转移 后端功能未实现
    if (operate === Remove_Operate) {
      // 1-transfer. 批量转移接口请求
      // const { success } = await editAlbum({ id: id, imageItems: JSON.stringify(imgArrCopy) });
      // if (success) {
      //   message.success('转移成功');
      // } else {
      //   message.error('转移失败');
      // }
    }
    setSelectKeys([]);
    // 2. 如果成功后替换数组
    setImgArr(imgArrCopy);
  };

  // 上传图片模态框确认方法
  const handleConfirm = async (value: any) => {
    const imgArrCopy = [...imgArr];
    const uploadImage = { uid: uuid(12, 16), url: value.image, status: true };
    imgArrCopy.push(uploadImage);
    const { success } = await editAlbum({ id: id, imageItems: JSON.stringify(imgArrCopy) });
    if (success) {
      setOpenParam({
        open: false,
      });
      message.success('添加成功');
    } else {
      message.success('添加失败');
    }
  };

  // 上传图片模态框取消方法
  const handleCancel = () => {
    setOpenParam({
      open: false,
    });
  };

  // 转移图片模态框确认方法
  const handleTransferModalConfirm = (value: any, selectedUid: string[]) => {
    handleOperation(Transfer_Operate, selectedUid, value.name);
    setTransferModal({
      open: false,
    });
    // console.log(value);
  };

  // 转移图片模态框取消方法
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
        {imgArr.map((img: Img) => (
          <div key={img.uid}>
            <img
              alt="img"
              src={img.url}
              onError={(e: any) => {
                e.target.src = '/icons/icon-128x128.png';
              }}
            />
            <div>
              <Checkbox
                checked={selectedImgs.includes(img.uid)}
                onChange={(e: CheckboxChangeEvent) => handleChecked(img.uid)}
              />
              <a onClick={() => setTransferModal({ open: true, selectedUid: [img.uid] })}>
                转移相册
              </a>
              <a
                onClick={() => {
                  modal.confirm({
                    title: '删除节点',
                    content: '是否要删除节点',
                    onOk: async () => {
                      handleOperation(Remove_Operate, [img.uid]);
                    },
                  });
                }}
              >
                删除相片
              </a>
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
              setTransferModal({ open: true, selectedUid: selectedImgs });
            }}
          >
            批量转移
          </Button>
          <Button
            onClick={async () => {
              await handleOperation(Transfer_Operate, selectedImgs);
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      {contextHolder}
      <UploadModal
        openParam={openParam}
        albumList={albumList}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
      <TransferModal
        openParam={transferModal}
        albumList={albumList}
        handleConfirm={handleTransferModalConfirm}
        handleCancel={handleTransferModalCancel}
      />
    </div>
  );
};

export default AlbumDetails;
