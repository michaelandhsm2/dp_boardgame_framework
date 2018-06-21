function Random(ctx, isFloat = false){
  if(ctx.seed === undefined) ctx.seed = 10;

  let randNum = ctx.seed % 2147483647;
  if (randNum <= 0) randNum += 2147483646;

  randNum = randNum * 16807 % 2147483647;
  ctx.seed = randNum;

  if (isFloat){
    randNum = (ctx.seed - 1) / 2147483646;
  }

  return randNum;
}

export default Random;
