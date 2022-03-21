<script lang="ts" setup>
import { reactive, computed } from "vue";
import { transpose } from "@/services/Music";

//#region DATA
const state = reactive({
  tablature: "",
  result: "",
  pitch: -1,
  showResults: false,
  resultsCopied: false,
  errorMsg: "",
});
//#endregion

//#region COMPUTED
const dynamicTxtareaRows = computed(() => {
  let maxRows = 11;
  if (state.errorMsg) maxRows -= 3;
  if (state.resultsCopied) maxRows -= 2;
  return maxRows;
});
//#endregion

//#region METHODS
const onTransposeClick = async (): Promise<void> => {
  if (!state.tablature) return Promise.resolve();

  try {
    const transposed = await transpose(state.tablature, state.pitch);
    state.result = transposed;
    state.showResults = true;
    state.resultsCopied = false;
  } catch (e: any) {
    state.errorMsg = e.message;
  }
};

const onResetClick = (): void => {
  state.tablature = "";
  state.result = "";
  state.pitch = -1;
  state.showResults = false;
  state.resultsCopied = false;
  state.errorMsg = "";
};

const onResultsClick = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  target.select();
  target.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(target.value);
  state.resultsCopied = true;
};

const onCloseClick = (): void => {
  state.errorMsg = "";
};
//#endregion
</script>

<template>
  <div class="d-flex card mt-3 p-3">
    <div
      v-if="state.errorMsg"
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      <strong>Error!</strong> {{ state.errorMsg }}
      <button type="button" class="btn-close" @click="onCloseClick"></button>
    </div>
    <div class="flex-fill">
      <div class="mt-2">
        <textarea
          v-model="state.tablature"
          v-show="!state.showResults"
          class="form-control"
          :rows="dynamicTxtareaRows"
        />
      </div>
      <div>
        <textarea
          v-model="state.result"
          v-show="state.showResults"
          @click="onResultsClick"
          class="form-control"
          :rows="dynamicTxtareaRows"
          readonly
        />
        <p v-if="state.resultsCopied" class="mt-2 text-success fw-bold fs-6">
          <small>✔️ Copied!</small>
        </p>
      </div>
    </div>
    <div class="flex-fill mt-3 px-2">
      <div>
        <p>Pitch adjustment:</p>
      </div>
      <div class="form-check">
        <input
          v-model="state.pitch"
          :value="-1"
          class="form-check-input"
          type="radio"
          id="decreasePitch"
          checked
        />
        <label class="form-check-label" for="decreasePitch">Decrease</label>
      </div>
      <div class="form-check">
        <input
          v-model="state.pitch"
          :value="1"
          class="form-check-input"
          type="radio"
          id="increasePitch"
        />
        <label class="form-check-label" for="increasePitch">Increase</label>
      </div>
      <div class="mb-2 d-grid gap-1 mt-3">
        <button
          v-show="!state.showResults"
          class="btn btn-primary btn-lg"
          @click="onTransposeClick"
        >
          Transpose
        </button>
        <button
          v-show="state.showResults"
          class="btn btn-primary btn-lg"
          @click="state.showResults = false"
        >
          Edit
        </button>
        <button class="btn btn-secondary btn-lg" @click="onResetClick">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>
