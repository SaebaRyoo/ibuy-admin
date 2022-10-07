import { Request, Response } from 'express';
import moment from 'moment';
import { parse } from 'url';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: API.SpuListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      id: index,
      sn: Math.floor(Math.random() * 1000).toString(),
      name: ['TCL', '华为', 'ihpone', '海尔', '小米'][Math.floor(Math.random() * 5)],
      caption: ['副标题1', '副标题2', '副标题3', '副标题4', '副标题5'][
        Math.floor(Math.random() * 5)
      ],
      brand_id: 1,
      category1_id: 1,
      category2_id: 2,
      category3_id: 3,
      template_id: 1,
      freight_id: 1,
      image: 'http://test1.png',
      images: 'http://test1.png',
      sale_service: 'test',
      introduction: '高端商品',
      spec_items: 'abc',
      para_items: 'abc',
      sale_num: 12345,
      comment_num: 123,
      is_marketable: '0',
      is_enable_spec: '1',
      is_delete: '0',
      status: '0',
      updatedAt: moment().format('YYYY-MM-DD'),
      createdAt: moment().format('YYYY-MM-DD'),
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getRule(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    API.SpuListItem & {
      sorter: any;
      filter: any;
    };

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  if (params.sorter) {
    const sorter = JSON.parse(params.sorter);
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data?.name?.includes(params.name || ''));
  }
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };

  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.id) === -1);
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule: API.SpuListItem = {
          id: i,
          sn: Math.floor(Math.random() * 1000).toString(),
          name: ['TCL', '华为', 'ihpone', '海尔', '小米'][Math.floor(Math.random() * 5)],
          caption: ['副标题1', '副标题2', '副标题3', '副标题4', '副标题5'][
            Math.floor(Math.random() * 5)
          ],
          brand_id: 1,
          category1_id: 1,
          category2_id: 2,
          category3_id: 3,
          template_id: 1,
          freight_id: 1,
          image: 'http://test1.png',
          images: 'http://test1.png',
          sale_service: 'test',
          introduction: '高端商品',
          spec_items: 'abc',
          para_items: 'abc',
          sale_num: 12345,
          comment_num: 123,
          is_marketable: '0',
          is_enable_spec: '1',
          is_delete: '0',
          status: '0',
          updatedAt: moment().format('YYYY-MM-DD'),
          createdAt: moment().format('YYYY-MM-DD'),
        };
        tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      return;

    case 'update':
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.id === key) {
            newRule = { ...item, desc, name };
            return { ...item, desc, name };
          }
          return item;
        });
        return res.json(newRule);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/mock/spu': getRule,
  'POST /api/mock/spu': postRule,
};
