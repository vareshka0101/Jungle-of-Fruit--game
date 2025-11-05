import styles from "./game.module.css";

function Fruit({ fruit, onClick }) {
  return (
    <div
      className={styles.fruit}
      style={{
        left: `${fruit.x}px`,
        top: `${fruit.y}px`,

        backgroundImage: `url(${fruit.icon})`,
      }}
      onClick={onClick}
    ></div>
  );
}

export default Fruit;
