const asyncFnSuccess = async() => {}

const asyncFnSuccessTimeout = () => new Promise((resolve, reject) => setTimeout(reject, 1));

const asyncFn1stError = async() => {
  throw new Error('asyncFn1stError');
}

const asyncFn2ndError = async() => {
  await asyncFnSuccess();
  throw new Error('asyncFn1stError');
}

const run1st = async () => {
  const result = asyncFn1stError();
  if (result instanceof Promise) {
    await result.catch(() => console.log(`cautch properly error from 1st`));
  }
}

const run2nd = async () => {
  const result = asyncFn2ndError();
  if (result instanceof Promise) {
    await result.catch(() => console.log(`cautch properly error from 2nd`));
  }
}

const run1stAfterSuccess = async () => {
  const result = asyncFn1stError();

  await asyncFnSuccess();

  if (result instanceof Promise) {
    await result.catch(() => console.log(`cautch properly error from 1stAfterSuccess`));
  }
}

const run1stAfterSuccessTimeout = async () => {
  const result = asyncFn1stError();

  await asyncFnSuccessTimeout();

  if (result instanceof Promise) {
    await result.catch(() => console.log(`cautch properly error from run1stAfterSuccessTimeout`));
  }
}

run1st();

run2nd();

run1stAfterSuccess();

// here should throw the error
run1stAfterSuccessTimeout();
