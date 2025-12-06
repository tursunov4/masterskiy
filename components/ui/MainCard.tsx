import Image from "next/image";

const MainCard = () => {
  return (
    <div>
      <Image
        src={"/image/card.png"}
        alt="card"
        width={200}
        height={60}
        className=""
      />
      <h3>lestina</h3>
      <h4>Lorem, ipsum dolor.</h4>
    </div>
  );
};

export default MainCard;
