const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="avatar placeholder w-[100px] h-[100px] object-cover">
      <div className="bg-neutral text-neutral-content">
        <span className="text-3xl">{name.charAt(0)}</span>
      </div>
    </div>
  );
};

export default Avatar;
