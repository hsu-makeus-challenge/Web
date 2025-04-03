import { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="todo-container">{children}</div>;
};

export default Container;
