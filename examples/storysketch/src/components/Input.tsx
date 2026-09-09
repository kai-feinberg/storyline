import React, { useCallback } from "react";

export const Input: React.FC<{
  projectTitle: string;
  setProjectTitle: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
}> = ({ projectTitle, setProjectTitle, disabled }) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setProjectTitle(e.currentTarget.value);
    },
    [setProjectTitle],
  );

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="project-title"
        className="text-sm font-medium text-foreground"
      >
        Project title
      </label>
      <input
        id="project-title"
        type="search"
        autoComplete="off"
        className="leading-[1.7] block w-full rounded-geist bg-background p-geist-half text-foreground text-sm border border-unfocused-border-color transition-colors duration-150 ease-in-out focus:border-focused-border-color outline-none"
        disabled={disabled}
        name="projectTitle"
        value={projectTitle}
        onChange={onChange}
      />
    </div>
  );
};
