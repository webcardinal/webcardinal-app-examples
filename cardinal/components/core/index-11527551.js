function promisifyEventEmit(event, args = {}) {
  return new Promise((resolve, reject) => {
    event.emit(Object.assign(Object.assign({}, args), { callback: (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      } }));
  });
}

export { promisifyEventEmit as p };
