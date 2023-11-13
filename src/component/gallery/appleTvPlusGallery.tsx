"use client";

import { useRef, useState } from "react";
import styles from "./appleTvPlusGallery.module.css";

interface AppleTvPlusGalleryProps {
  imageUrls: string[];
  windowLength?: number;
}

export default function AppleTvPlusGallery({
  imageUrls,
  windowLength = 3,
}: AppleTvPlusGalleryProps) {
  const itemLength = imageUrls.length;

  // TODO: use css variable and media query
  const itemWidth = 700;

  const [containerOffset, setContainerOffset] = useState(0);
  const [current, setCurrent] = useState(1);

  // is it too many variables?
  const itemOffset = useRef<number[]>();
  const itemPositions = useRef<number[]>();
  const sequenceEdgeValue = useRef(
    itemLength - windowLength + (windowLength - 1) / 2
  );

  if (itemOffset.current === undefined) {
    let sequences = new Array(itemLength).fill(0).map((_, index) => index);
    sequences[itemLength - 1] = -1;
    itemPositions.current = sequences;
    itemOffset.current = sequences.map((item) => item * itemWidth);
  }

  const handleDotClick = (index: number) => {
    const nextCurrent = index + 1;
    if (current === nextCurrent) {
      return;
    }
    const positionChange = current - nextCurrent;

    setCurrent(nextCurrent);
    setContainerOffset((offset) => offset + positionChange * itemWidth);

    const edgePosition = sequenceEdgeValue.current;

    itemPositions.current = (itemPositions.current as number[]).map((p, i) => {
      const finalPosition = p + positionChange;
      // TODO：remove off screen item to the tail base on slide direction
      // render timing?
      if (finalPosition < -1 * edgePosition) {
        (itemOffset.current as number[])[i] += itemLength * itemWidth;
        return finalPosition + itemLength;
      } else if (finalPosition > edgePosition) {
        (itemOffset.current as number[])[i] -= itemLength * itemWidth;
        return finalPosition - itemLength;
      }
      return finalPosition;
    });
  };

  return (
    <div className={styles.gallery}>
      <div
        className={styles.item_container}
        style={{ transform: `translate3d(${containerOffset}px,0px,0px)` }}
      >
        {imageUrls.map((imageUrl, index) => (
          <div
            key={imageUrl}
            className={styles.item}
            style={{
              transform: `translate(${
                (itemOffset.current as number[])[index]
              }px,0px)`,
            }}
          >
            <a
              href="/"
              style={{
                backgroundImage: "url(" + imageUrl + ")",
              }}
            ></a>
          </div>
        ))}
      </div>

      {/* paddlenav paddle is suit for the component and function */}
      <div className="paddlenav"></div>

      <div className={styles.tablist_wrapper}>
        <ul className={styles.dotnav}>
          {imageUrls.map((_, index) => {
            const liClassname =
              index + 1 === current
                ? [styles.dotnav_item, styles.current].join(" ")
                : styles.dotnav_item;

            return (
              <li
                className={liClassname}
                key={index}
                onClick={() => handleDotClick(index)}
              ></li>
            );
          })}
        </ul>
      </div>
      <button className="play-pause-btn"></button>
    </div>
  );
}
