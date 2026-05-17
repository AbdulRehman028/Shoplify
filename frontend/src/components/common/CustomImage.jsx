import React from "react";

const CustomImage = ({ 
  src, 
  alt = "Product Image", 
  className, 
  customDefault = "/images/default_product.png",
  ...props 
}) => {
  return (
    <img
      {...props}
      src={src || customDefault}
      alt={alt}
      className={className}
    //   loading="lazy" // High Performance: Browser handles lazy loading
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = customDefault;
      }}
    />
  );
};

export default CustomImage;
