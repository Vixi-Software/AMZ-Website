const loaderHTML = `
  <style id="loader-styles">
    @keyframes bounce05 {
      85%, 92%, 100% { transform: translateY(0); }
      89% { transform: translateY(-4px); }
      95% { transform: translateY(2px); }
    }
    @keyframes slide05 {
      5% { transform: translateX(14px); }
      15%, 30% { transform: translateX(6px); }
      40%, 55% { transform: translateX(0); }
      65%, 70% { transform: translateX(-4px); }
      80%, 89% { transform: translateX(-12px); }
      100% { transform: translateX(14px); }
    }
    @keyframes paper05 {
      5% { transform: translateY(46px); }
      20%, 30% { transform: translateY(34px); }
      40%, 55% { transform: translateY(22px); }
      65%, 70% { transform: translateY(10px); }
      80%, 85% { transform: translateY(0); }
      92%, 100% { transform: translateY(46px); }
    }
    @keyframes keyboard05 {
      5%, 12%, 21%, 30%, 39%, 48%, 57%, 66%, 75%, 84% {
        box-shadow: 15px 0 0 #fff, 30px 0 0 #fff, 45px 0 0 #fff, 60px 0 0 #fff, 75px 0 0 #fff, 90px 0 0 #fff,
                    22px 10px 0 #fff, 37px 10px 0 #fff, 52px 10px 0 #fff, 60px 10px 0 #fff, 68px 10px 0 #fff, 83px 10px 0 #fff;
      }
    }
  </style>
  <div id="global-loader" style="
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex; justify-content: center; align-items: center;
    z-index: 9999;
  ">
    <div style="animation: bounce05 3s linear infinite; position: relative;">
      <div style="width:92px; height:20px; border-radius:3px; margin-left:14px;
        background: linear-gradient(#5C86FF, #275EFE);
        animation: slide05 3s ease infinite;
        transform: translateX(14px);
        position: relative;">
        <i style="position:absolute; right:100%; width:6px; height:4px; top:4px; background:#FBC56C;"></i>
        <div style="position:absolute; left:100%; top:6px; width:2px; height:8px; background:#FBC56C;"></div>
        <div style="position:absolute; left:94px; top:3px; height:14px; width:6px; border-radius:3px; background:#FBC56C;"></div>
      </div>
      <div style="position:absolute; left:24px; top:-26px; width:40px; height:46px; border-radius:5px;
        background:#EEF0FD; transform: translateY(46px); animation: paper05 3s linear infinite;">
        <div style="position:absolute; left:6px; right:6px; top:7px; border-radius:2px; height:4px;
          background:#D3D4EC; transform: scaleY(0.8);
          box-shadow: 0 12px 0 #D3D4EC, 0 24px 0 #D3D4EC, 0 36px 0 #D3D4EC;"></div>
      </div>
      <div style="width:120px; height:56px; margin-top:-10px; z-index:1; position:relative;">
        <div style="position:absolute; top:0; left:0; right:0; bottom:0; border-radius:7px;
          background: linear-gradient(135deg, #5C86FF, #275EFE);
          transform: perspective(10px) rotateX(2deg);
          transform-origin: 50% 100%;"></div>
        <div style="position:absolute; left:2px; top:25px; width:11px; height:4px; border-radius:2px;
          animation: keyboard05 3s linear infinite;"></div>
      </div>
    </div>
  </div>
`;

export function loading(show) {
  if (show) {
    if (document.getElementById("global-loader")) return;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = loaderHTML;
    document.body.appendChild(wrapper);
  } else {
    const loader = document.getElementById("global-loader");
    if (loader) loader.remove();
  }
}
