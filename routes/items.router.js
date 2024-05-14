import express from 'express';
import joi from 'joi';
import Item from '../schemas/items.schema.js';

const router = express.Router();

/**
요구사항
1. `item_name` 데이터는 **필수적으로 존재**해야한다.
2. `item_name` 데이터는 **문자열 타입**이어야한다.
3. `item_name` 데이터는 **최소 1 글자 이상**이어야한다.
4. `item_name` 데이터는 **최대 15글자 이하**여야한다.
5. 유효성 검사에 실패했을 때, 에러가 발생해야한다.

1. `item_stat` 데이터는 **객체 타입**이어야한다.
**/

const createItemSchema = joi.object({
  item_name: joi.string().min(1).max(15).required(),
  item_stat: joi.object(),
});

//** 아이템 생성 API **/
router.post('/items', async (req, res, next) => {
  try {
    // 1. 클라이언트로부터 받아온 item_name, item_stat 데이터를 가져온다.
    // 유효성 검사는 validateAsync 메서드를 사용한다.
    const validation = await createItemSchema.validateAsync(req.body);

    const { item_name, item_stat } = validation;

    // item_name, item_stat 가 존재하지 않을 때, 클라이언트에게 에러 메시지를 전달합니다.
    if (!item_name) {
      return res.status(400).json({
        errorMessage: '아이템 이름(item_name) 데이터가 존재하지 않습니다.',
      });
    }
    if (!item_stat) {
      return res.status(400).json({
        errorMessage: '아이템 스텟(item_stat) 데이터가 존재하지 않습니다.',
      });
    }

    // 2. 해당하는 마지막 order 데이터를 조회한다.
    // findOne 은 1개의 데이터만 조회한다.
    // sort 는 정렬한다. -> 어떤 컬럼을? -> 컬럼명만 적으면 오름차순, -컬럼명을 적으면 내림차순
    const itemMaxCode = await Item.findOne().sort('-item_code').exec();

    // 3. 만약 존재한다면 현재 해야 할 일을 +1 하고, order 데이터가 존재하지 않다면, 1 로 할당한다.
    const item_code = itemMaxCode ? itemMaxCode.item_code + 1 : 1;

    // 4. 아이템 등록
    const item = new Item({ item_code, item_name, item_stat });
    await item.save();

    // 5. 아이템을 클라이언트에게 반환한다.
    return res.status(201).json({ item });
  } catch (err) {
    // Router 다음에 있는 에러 처리 미들웨어를 실행한다.
    next(err);
  }
});

//** 아이템 수정 API **/
router.patch('/items/:item_code', async (req, res, next) => {
  try {
    // 수정할 'item_code' 값을 가져옵니다.
    const { item_code } = req.params;

    // 유효성 검사는 validateAsync 메서드를 사용한다.
    const validation = await createItemSchema.validateAsync(req.body);
    // 아이템 이름과 스텟을 어떻게 수정할 지 item_name, item_stat 값을 가져옵니다.
    const { item_name, item_stat } = validation;

    // 유효성 검사
    // 아이템 존재하지 않을 때, 클라이언트에게 에러 메시지를 전달합니다.
    const currentItem = await Item.findOne({
      item_code: `${item_code}`,
    }).exec();

    if (!currentItem) {
      return res
        .status(400)
        .json({ errorMessage: '아이템 코드 데이터가 존재하지 않습니다.' });
    }
    if (item_name) {
      currentItem.item_name = item_name;
    }
    if (item_stat) {
      currentItem.item_stat = item_stat;
    }

    await currentItem.save();

    return res.status(200).json({});
  } catch (err) {
    next(err);
  }
});

//** 아이템 목록 조회 API **/
router.get('/items', async (req, res, next) => {
  // Item모델을 이용해, MongoDB에서 'item_code' 값이 가장 높은 '아이템'을 찾습니다.
  const items = await Item.find()
    .sort('-item_code')
    .select('item_code item_name')
    .exec();

  // 찾은 '아이템'을 클라이언트에게 전달합니다.
  return res.status(200).json({ items });
});

//** 아이템 상세 조회 API **/
router.get('/items/:item_code', async (req, res, next) => {
  // 조회할 'item_code' 값을 가져옵니다.
  const { item_code } = req.params;

  // 조회하려는 'item_code'를 가져옵니다. 만약, 해당 item_code값을 가진 '아이템'이 없다면 에러를 발생시킵니다.
  const item = await Item.findOne({ item_code: `${item_code}` }).exec();

  // 유효성 검사
  if (!item) {
    return res
      .status(404)
      .json({ errorMessage: '존재하지 않는 아이템입니다.' });
  }

  // 찾은 '아이템'을 클라이언트에게 전달합니다.
  return res.status(200).json({ item });
});

export default router;
