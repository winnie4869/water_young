import express from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();
import { createproduct } from "../controllers/productsController.js";


productsRouter.post("/", async(createProduct));

//상품 등록 API를 만들어 주세요.
//name, description, price, tags를 입력하여 상품을 등록합니다.
router.post("/products", async (req, res) => {
  const { name, description, price, tags } = req.body;
  //상품 등록 시 필요한 필드(이름, 설명, 가격 등)의 유효성을 검증하는 미들웨어를 구현합니다.
  if (!name || !description || !price || !tags) {
    return res.status(400).json({ error: "필수로 작성해야 합니다." });
  }
  if (typeof price !== "number") {
    return res.status(400).json({ error: "가격은 숫자여야 합니다." });
  }

  try {
    const product = await Prisma.product.create({
      data: req.body,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("상품 등록 중 오류발생", error);
    res.status(500).json({ error: "상품 등록에 실패했습니다.. " });
  }
});

/////////////////////////////////상품 목록 특정 아이디조회 API
router.get("/products/:id", async (req, res) => {
  // URL 파라미터에서 상품 ID를 가져옵니다.
  const { id } = req.params;
  const productId = parseInt(id);

  if (isNaN(productId)) {
    return res.status(400).json({error: "유효하지 않은 상품 ID입니다."});
  }

  try {
    const product = await Prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "상품을 찾을 수 없습니다." });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("상품 조회 중 오류발생:, error");
    res.status(500).json({ error: "상품 조회에 실패하였습니다." });
  }
});

////////////////////////////////////////////상품 목록 조회
router.get('/products' async (req, res)=>{
const{ q, offset = 0, limit = 10, orderBy='recent'} = req.query;

// 정렬 조건을 설정합니다. 최신순', '가격 낮은 순', '가격 높은 순' 
const orderBycondition = orderBy === 'recent' ? { createAt: 'desc'} : {};

 // name, description에 포함된 단어로 검색할 수 있습니다. q=검색
const whereCondition = q
? {
  OR:[
  { name: { contain: q, mode: 'insentive'} },
  { description: { contain: q, mode: 'insensitive'}}, //mode: 'insensitive': 대소문자를 구분하지 않고 검색
   ],
 }
:{};

})
try{
  const product = await prisma.product.findmany ({
where: whereCondition,
skip: parseInt(offset),
take: parseInt(limit),
orderBy: orderByCondition,
  });
  
  res.status(200).json(products);
} catch (error){
  console.error('상품목록 조회 중 오류발색:',error);
  res.status(500).json({error: "상품 목록 조회에 실패햇습니다."})
});

//////////////////////////////////////







export default productsRouter;
