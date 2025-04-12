import React, { useRef, useImperativeHandle } from "react";

const SidebarMaybe = (props, ref) => {
  const { children } = props;
  const sidebarRef = useRef(null);

  useImperativeHandle(ref, () => ({
    close: () => {
      sidebarRef.current?.classList.add("translate-x-[100%]");
    },
    toggle: () => {
      sidebarRef.current?.classList.toggle("translate-x-[100%]");
    },
  }));

  return (
    <aside
      ref={sidebarRef}
      onClick={(e) => {
        ref.current.toggle();
      }}
      onTouchMove={(e) => {
        ref.current.close();
      }}
      className="fixed right-0 top-0 z-[110] h-screen w-[85%] translate-x-[100%] bg-[#242424] duration-300 sm:w-[75%] md:hidden"
    >
      {children}
    </aside>
  );
};

export default React.forwardRef(SidebarMaybe);
