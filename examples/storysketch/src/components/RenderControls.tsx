import { z } from "zod";
import { COMP_NAME, CompositionProps } from "../../types/constants";
import { type State, useRendering } from "../helpers/use-rendering";
import { DownloadButton } from "./DownloadButton";
import { ErrorComp } from "./Error";
import { ProgressBar } from "./ProgressBar";
import { Button } from "./ui/button";

export const RenderControls: React.FC<{
  projectId?: string | null;
  initialRenderState?: Extract<State, { status: "done" }> | null;
  renderSignature?: string;
  inputProps: z.infer<typeof CompositionProps>;
  disabled?: boolean;
  compact?: boolean;
}> = ({
  projectId,
  initialRenderState,
  renderSignature,
  inputProps,
  disabled,
  compact = false,
}) => {
  const { renderMedia, state, undo } = useRendering(COMP_NAME, inputProps, {
    projectId,
    initialState: initialRenderState ?? undefined,
    renderSignature,
  });

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {state.status === "init" ||
        state.status === "invoking" ||
        state.status === "error" ? (
          <>
            <Button
              disabled={state.status === "invoking" || disabled}
              loading={state.status === "invoking"}
              onClick={renderMedia}
              size="sm"
              className="h-8 rounded-md bg-[#315f8f] px-3 text-xs text-[#f7fbff] hover:bg-[#274d73] disabled:opacity-40"
            >
              {state.status === "invoking" ? "Rendering..." : "Export video"}
            </Button>

            {state.status === "invoking" ? (
              <div className="w-28">
                <ProgressBar progress={state.progress} />
              </div>
            ) : null}

            {state.status === "error" ? (
              <span className="max-w-48 truncate text-xs text-geist-error">
                {state.error.message}
              </span>
            ) : null}
          </>
        ) : null}

        {state.status === "done" ? (
          <>
            <span className="hidden text-xs text-[#7a7369] xl:inline">
              Export ready
            </span>
            <DownloadButton undo={undo} state={state} />
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9a9186]">
        Export
      </p>

      {state.status === "init" ||
      state.status === "invoking" ||
      state.status === "error" ? (
        <>
          <Button
            disabled={state.status === "invoking" || disabled}
            loading={state.status === "invoking"}
            onClick={renderMedia}
            size="sm"
            className="h-8 w-full bg-[#1f1d1a] text-xs text-[#fffdfa] hover:bg-[#2a2723] disabled:opacity-40"
          >
            {state.status === "invoking" ? "Rendering..." : "Export Video"}
          </Button>

          {state.status === "invoking" ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#5c564d]">{state.phase}</span>
                <span className="text-[#9a9186]">
                  {state.progress < 1
                    ? `${Math.max(Math.round(state.progress * 100), 1)}%`
                    : "Complete"}
                </span>
              </div>
              <ProgressBar progress={state.progress} />
            </div>
          ) : null}

          {state.status === "error" ? (
            <ErrorComp message={state.error.message} />
          ) : null}
        </>
      ) : null}

      {state.status === "done" ? (
        <>
          <ProgressBar progress={1} />
          <p className="text-[10px] text-[#7a7369]">
            Latest export is saved and available after refresh.
          </p>
          <DownloadButton undo={undo} state={state} />
        </>
      ) : null}
    </div>
  );
};
