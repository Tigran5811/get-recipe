/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import styles from "./Card.module.scss";
const cx = classNames.bind(styles);

export const Card = (data: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {data.data.map((item: any, index: number) => (
        <div className={cx("line", {})} key={item}>
          {index + 1}. {item}
        </div>
      ))}
    </div>
  );
};
