import { title_font } from '@/config/fonts';

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const TitleComponent = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`${className} mt-7`}>
      <h1
        className={`${title_font.className} antialiased text-4xl font-semibold capitalize`}
      >
        {title}
      </h1>

      {subtitle ? <h3 className="text-xl mb-5">{subtitle}</h3> : null}
    </div>
  );
};
