import React from "react"
import { Triangle } from "react-loader-spinner"
import "../../stylesheets/Loader.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loader() {
  return (
    <div className="loadingContainer">
      <Triangle ariaLabel="loading-indicator" />
    </div>
  )
}

