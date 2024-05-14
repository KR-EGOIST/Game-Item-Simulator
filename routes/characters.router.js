import express from 'express';
import joi from 'joi';
import myCharacter from '../schemas/characters.schema.js';

const router = express.Router();

/**
요구사항
1. `name` 데이터는 **필수적으로 존재**해야한다.
2. `name` 데이터는 **문자열 타입**이어야한다.
3. `name` 데이터는 **최소 1글자 이상**이어야한다.
4. `name` 데이터는 **최대 10글자 이하**여야한다.
5. 유효성 검사에 실패했을 때, 에러가 발생해야한다.

1. `health` 데이터는 **필수적으로 존재**해야한다.
2. `health` 데이터는 **숫자 타입**이어야한다.
3. `health` 데이터는 **최소 1 이상**이어야한다.
4. 유효성 검사에 실패했을 때, 에러가 발생해야한다.

1. `power` 데이터는 **필수적으로 존재**해야한다.
2. `power` 데이터는 **숫자 타입**이어야한다.
3. `power` 데이터는 **최소 1 이상**이어야한다.
4. 유효성 검사에 실패했을 때, 에러가 발생해야한다.
**/

const createCharacterSchema = joi.object({
  name: joi.string().min(1).max(10).required(),
  health: joi.number().min(1).required(),
  power: joi.number().min(1).required(),
});

//** 캐릭터 생성 API **/
router.post('/myCharacters', async (req, res, next) => {
  try {
    // 1. 클라이언트로부터 받아온 name, health, power 데이터를 가져온다.
    // 유효성 검사는 validateAsync 메서드를 사용한다.
    const validation = await createCharacterSchema.validateAsync(req.body);

    const { name, health, power } = validation;

    // 유효성 검사
    // name이 존재하지 않을 때, 클라이언트에게 에러 메시지를 전달합니다.
    if (!name) {
      return res
        .status(400)
        .json({ errorMessage: '닉네임 데이터가 존재하지 않습니다.' });
    }
    // health가 존재하지 않을 때, 클라이언트에게 에러 메시지를 전달합니다.
    if (!health) {
      return res
        .status(400)
        .json({ errorMessage: '체력 데이터가 존재하지 않습니다.' });
    }
    // power가 존재하지 않을 때, 클라이언트에게 에러 메시지를 전달합니다.
    if (!power) {
      return res
        .status(400)
        .json({ errorMessage: '공격력 데이터가 존재하지 않습니다.' });
    }

    // 2. 해당하는 마지막 character_id 데이터를 조회한다.
    // findOne 은 1개의 데이터만 조회한다.
    // sort 는 정렬한다. -> 어떤 컬럼을? -> 컬럼명만 적으면 오름차순, -컬럼명을 적으면 내림차순
    const myCharacterMaxId = await myCharacter
      .findOne()
      .sort('-character_id')
      .exec();

    // 3. 만약 존재한다면 현재 character_id을 +1 하고, character_id 데이터가 존재하지 않다면, 1 로 할당한다.
    const character_id = myCharacterMaxId
      ? myCharacterMaxId.character_id + 1
      : 1;

    // 4. 캐릭터 등록
    const MyCharacter = new myCharacter({ character_id, name, health, power });
    await MyCharacter.save();

    // 5. 캐릭터를 클라이언트에게 반환한다.
    return res.status(201).json({ MyCharacter });
  } catch (err) {
    // Router 다음에 있는 에러 처리 미들웨어를 실행한다.
    next(err);
  }
});

//** 캐릭터 삭제 API **/
router.delete('/myCharacters/:character_id', async (req, res, next) => {
  // 삭제할 캐릭터 ID 값을 가져옵니다.
  const { character_id } = req.params;

  // 삭제하려는 '캐릭터 ID 값'을 가져옵니다. 만약, 해당 ID값을 가진 '캐릭터'가 없다면 에러를 발생시킵니다.
  const MyCharacter = await myCharacter
    .findOne({ character_id: `${character_id}` })
    .exec();

  // 유효성 검사
  if (!MyCharacter) {
    return res
      .status(404)
      .json({ errorMessage: '존재하지 않는 캐릭터입니다.' });
  }

  // 조회된 '캐릭터'를 삭제합니다.
  await myCharacter.deleteOne({ character_id: character_id }).exec();

  return res.status(200).json({});
});

//** 등록한 캐릭터 전부 조회 API **/
router.get('/myCharacters', async (req, res, next) => {
  // myCharacter모델을 이용해, MongoDB에서 'character_id' 값이 가장 높은 '캐릭터'를 찾습니다.
  const myCharacters = await myCharacter.find().sort('-character_id').exec();

  // 찾은 '캐릭터'를 클라이언트에게 전달합니다.
  return res.status(200).json({ myCharacters });
});

//** 캐릭터 상세 조회 API **/
router.get('/myCharacters/:character_id', async (req, res, next) => {
  // 조회할 '캐릭터 ID' 값을 가져옵니다.
  const { character_id } = req.params;

  // 조회하려는 '캐릭터 ID'를 가져옵니다. 만약, 해당 ID값을 가진 '캐릭터'가 없다면 에러를 발생시킵니다.
  const MyCharacter = await myCharacter
    .findOne({ character_id: `${character_id}` })
    .exec();

  // 유효성 검사
  if (!MyCharacter) {
    return res
      .status(404)
      .json({ errorMessage: '존재하지 않는 캐릭터입니다.' });
  }

  // 찾은 '캐릭터'을 클라이언트에게 전달합니다.
  return res.status(200).json({ MyCharacter });
});

export default router;