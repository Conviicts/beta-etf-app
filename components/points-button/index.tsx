"use client"

import { Button } from "@/components/button"
import { Icon } from "@/components/icon"
import s from "./points-button.module.scss"
import { BorderAnimate } from "../border-animate"

interface PointsButtonProps {
  points: number
  multiplier?: number
  onClick: () => void
}

export const PointsButton = ({
  points,
  multiplier = 1.1,
  onClick
}: PointsButtonProps) => {
  return (
    <Button className={s.button} onClick={onClick} variant="secondary">
      <div className={s.content}>
        <Icon icon="hugeicons:trophy" className={s.icon} />
        <span className={s.text}>
          {points.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          })}
        </span>
        <span className={s.multiplier}>{multiplier.toFixed(1)}x</span>
      </div>
      <BorderAnimate />
    </Button>
  )
}
