const baseButtonClassNames: string =
  "select-none rounded-full cursor-pointer text-5xl flex items-center justify-center w-full h-full transition-all duration-200 ease-in-out border-2 hover:shadow-none focus:outline-none opacity-70 hover:opacity-100 active:scale-95";

export const buttonClassNames: string = `${baseButtonClassNames} 
  bg-[#e0e0e0] text-[#4d4d4d] 
  border-[rgb(206,206,206)] 
  shadow-[inset_4px_4px_10px_#bcbcbc,inset_-4px_-4px_10px_#ffffff] 
  focus:shadow-[inset_2px_2px_5px_#bcbcbc,inset_-2px_-2px_5px_#ffffff,2px_2px_5px_#bcbcbc,-2px_-2px_5px_#ffffff]`;

export const yellowButtonClassNames: string = `${baseButtonClassNames} 
  bg-[#fee685] text-[#5c4b00] 
  border-[#e6cc5f] 
  shadow-[inset_4px_4px_10px_#d9c368,inset_-4px_-4px_10px_#fff3b0] 
  focus:shadow-[inset_2px_2px_5px_#d9c368,inset_-2px_-2px_5px_#fff3b0,2px_2px_5px_#d9c368,-2px_-2px_5px_#fff3b0]`;

export const blueButtonClassNames: string = `${baseButtonClassNames} 
  bg-[#b8e6fe] text-[#124a66] 
  border-[#9ecfe5] 
  shadow-[inset_4px_4px_10px_#9ecfe5,inset_-4px_-4px_10px_#e6f7ff] 
  focus:shadow-[inset_2px_2px_5px_#9ecfe5,inset_-2px_-2px_5px_#e6f7ff,2px_2px_5px_#9ecfe5,-2px_-2px_5px_#e6f7ff]`;

export const darkBlueButtonClassNames: string = `${baseButtonClassNames} 
  bg-[#63bce3] text-[#0c3a4f] 
  border-[#4aa4c9] 
  shadow-[inset_4px_4px_10px_#4aa4c9,inset_-4px_-4px_10px_#9ed8f0] 
  focus:shadow-[inset_2px_2px_5px_#4aa4c9,inset_-2px_-2px_5px_#9ed8f0,2px_2px_5px_#4aa4c9,-2px_-2px_5px_#9ed8f0]`;
