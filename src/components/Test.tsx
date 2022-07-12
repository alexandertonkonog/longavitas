import React, { FC, useEffect, useState } from 'react';

const Test: FC<{ count: number }> = ({ count }) => {
  const [state, setState] = useState(count);
  const handleClick = () => {
    setState(prev => prev + 1);
  }
  console.log('outside:', count)
  console.log('inside:', state)

  const prom = async () => {
    const promise = new Promise<number>((resolve) => resolve(1));
    promise
      .then(res => {
        console.log(1);
      })
      .then(res => {
        console.log(2);
        throw new Error('123');
      })
      .then(res => {
        console.log(3);
      })
      .catch(err => {
        console.log(4)
      })
      .then(res => {
        console.log(5)
      })
  }

  useEffect(() => {
    console.log('changed')
    return () => {
      console.log('unmounted')
    }
  }, [state])

  useEffect(() => {
    prom();
  }, [])
  return (
    <div>
      <button onClick={handleClick} style={{
        padding: 20,
        background: 'grey',
      }}>{state}</button>
    </div>
  );
};

export default Test;