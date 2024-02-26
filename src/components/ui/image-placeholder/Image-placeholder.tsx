import Image from 'next/image';

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
  width: number;
  height: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ImagePlaceholder = ({
  src,
  alt,
  className,
  width,
  height,
  ...rest
}: Props) => {
  const local_src = src
    ? src.startsWith('http')
      ? src
      : `/products/${src}`
    : '/imgs/placeholder.jpg';

  return (
    <Image
      src={local_src}
      width={width}
      height={height}
      alt={alt}
      className={className}
      {...rest}
    />
  );
};
