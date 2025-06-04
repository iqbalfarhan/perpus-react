import { FC, PropsWithChildren } from 'react';
import Heading from './heading';

type ContainerProps = PropsWithChildren & {
  title?: string;
  description?: string;
};

const Container: FC<ContainerProps> = ({ children, title, description }) => {
  return (
    <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
      <Heading title={title ?? 'Page title'} description={description ?? 'Page description'} />
      {children}
    </div>
  );
};

export default Container;
