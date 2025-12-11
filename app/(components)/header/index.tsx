"use client"

import { Button } from "@/components/button"
import { Link } from "@/components/link"
import { Logotype } from "@/components/logotype"
import { PointsButton } from "@/components/points-button"
import { PointsModal } from "@/components/points-modal"
import { SettingsModal } from "@/components/settings-modal"
import routes from "@/config/routes"
import { useState } from "react"
import { Chains } from "../chains"
import { Nav } from "../nav"
import { Wallet } from "../wallet"
import s from "./header.module.scss"

export const Header = () => {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [pointsModalOpen, setPointsModalOpen] = useState(false)

  const handleSettingsOpen = () => {
    setSettingsOpen(true)
  }

  const handleSettingsClose = () => {
    setSettingsOpen(false)
  }

  const handlePointsModalOpen = () => {
    setPointsModalOpen(true)
  }

  const handlePointsModalClose = () => {
    setPointsModalOpen(false)
  }

  const currentPoints = 2261.01

  return (
    <>
      <header className={s.header}>
        <div className={s.content}>
          <Link className={s.logotype} href={routes.home}>
            <Logotype />
          </Link>
          <Nav />
          <div className={s.right}>
            <Button
              variant="secondary"
              icon="hugeicons:settings-02"
              onClick={handleSettingsOpen}
              title="Settings"
            />
            <Chains />
            <PointsButton
              points={currentPoints}
              onClick={handlePointsModalOpen}
            />
            <Wallet />
          </div>
        </div>
      </header>

      <SettingsModal open={settingsOpen} onClose={handleSettingsClose} />
      <PointsModal
        open={pointsModalOpen}
        onClose={handlePointsModalClose}
        points={currentPoints}
      />
    </>
  )
}
