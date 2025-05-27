import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";



interface SkeletonCompProps extends IContentLoaderProps {
    children?: React.ReactNode;
  }
  
  const SkeletonComp: React.FC<SkeletonCompProps> = (props) => {
    return (
        <ContentLoader
            speed={2}
            viewBox="0 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            {props.children}
        </ContentLoader>
    )
}

export default SkeletonComp;