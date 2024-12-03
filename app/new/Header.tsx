interface Props {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: Props) => {
  return (
    <div className="flex items-center space-x-5 mb-5 md:mb-10">
      <div className="form-header">
        <h1 className="text-3xl md:text-4xl mb-2">{title}</h1>
        <h3 className="text-tSecondary font-normal">{subtitle}</h3>
      </div>
    </div>
  );
};

export default Header;
