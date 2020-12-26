import { LinearProgress } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React, { FC } from 'react';
import { useStore } from "./store";

const ProgressBar: FC = observer(() => {
  const store = useStore();
  return (
    <div>
      {(!store.isInitialized.get() || !!store.loading.get()) && <LinearProgress></LinearProgress>}
    </div>
  )
});

export default ProgressBar;