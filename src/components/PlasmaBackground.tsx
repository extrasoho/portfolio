"use client";

import React from "react";

const PlasmaBackground: React.FC = () => {
  return (
    <>
      <div className="plasma-wrapper">
        <div className="gradient gradient-1"></div>
        <div className="gradient gradient-2"></div>
        <div className="gradient gradient-3"></div>
      </div>

      <style jsx>{`
        .plasma-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          filter: blur(150px);
          z-index: -10;
        }

        .gradient {
          position: absolute;
          border-radius: 100%;
          opacity: 0.14;
          mix-blend-mode: screen;
          animation-iteration-count: infinite;
          animation-timing-function: cubic-bezier(0.1, 0, 0.9, 1);
        }

        .gradient-1 {
          background: rgb(238, 161, 22) none repeat scroll 0% 0% / auto
            padding-box border-box;
          width: 700px;
          height: 700px;
          animation-duration: 11s;
          opacity: 0.6;
          left: 60%;
          top: 40%;
          z-index: -2;
          animation-name: animation-gradient-1;
        }

        .gradient-2 {
          background: rgb(202, 107, 22) none repeat scroll 0% 0% / auto
            padding-box border-box;
          width: 600px;
          height: 600px;
          animation-duration: 11s;
          opacity: 0.6;
          left: 40%;
          top: 60%;
          z-index: -1;
          animation-name: animation-gradient-2;
        }

        .gradient-3 {
          background: rgb(0, 0, 255) none repeat scroll 0% 0% / auto padding-box
            border-box;
          width: 500px;
          height: 500px;
          animation-duration: 11s;
          opacity: 0.6;
          left: 50%;
          top: 50%;
          z-index: -3;
          animation-name: animation-gradient-3;
        }

        @keyframes animation-gradient-1 {
          0% {
            transform: translateY(-50%) translateX(-50%) rotate(-20deg)
              translateX(20%);
          }
          25% {
            transform: translateY(-50%) translateX(-50%) skew(-15deg, -15deg)
              rotate(80deg) translateX(30%);
          }
          50% {
            transform: translateY(-50%) translateX(-50%) rotate(180deg)
              translateX(25%);
          }
          75% {
            transform: translateY(-50%) translateX(-50%) skew(15deg, 15deg)
              rotate(240deg) translateX(15%);
          }
          100% {
            transform: translateY(-50%) translateX(-50%) rotate(340deg)
              translateX(20%);
          }
        }

        @keyframes animation-gradient-2 {
          0% {
            transform: translateY(-50%) translateX(-50%) rotate(40deg)
              translateX(-20%);
          }
          25% {
            transform: translateY(-50%) translateX(-50%) skew(15deg, 15deg)
              rotate(110deg) translateX(-5%);
          }
          50% {
            transform: translateY(-50%) translateX(-50%) rotate(210deg)
              translateX(-35%);
          }
          75% {
            transform: translateY(-50%) translateX(-50%) skew(-15deg, -15deg)
              rotate(300deg) translateX(-10%);
          }
          100% {
            transform: translateY(-50%) translateX(-50%) rotate(400deg)
              translateX(-20%);
          }
        }

        @keyframes animation-gradient-3 {
          0% {
            transform: translateY(-50%) translateX(-50%) translateX(-15%)
              translateY(10%);
          }
          20% {
            transform: translateY(-50%) translateX(-50%) translateX(20%)
              translateY(-30%);
          }
          40% {
            transform: translateY(-50%) translateX(-50%) translateX(-25%)
              translateY(-15%);
          }
          60% {
            transform: translateY(-50%) translateX(-50%) translateX(30%)
              translateY(20%);
          }
          80% {
            transform: translateY(-50%) translateX(-50%) translateX(5%)
              translateY(35%);
          }
          100% {
            transform: translateY(-50%) translateX(-50%) translateX(-15%)
              translateY(10%);
          }
        }
      `}</style>
    </>
  );
};

export default PlasmaBackground;
