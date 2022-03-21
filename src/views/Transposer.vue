<script lang="ts" setup>
import { reactive } from "vue";
import { transpose } from "@/services/Music";

const state = reactive({
  tablature: "",
  result: "",
  pitch: -1,
  showResults: false,
  errorMsg: "",
});

const onTransposeClick = async (): Promise<void> => {
  if (!state.tablature) return Promise.resolve();

  try {
    const transposed = await transpose(state.tablature, state.pitch);
    state.result = transposed;
    state.showResults = true;
  } catch (e: any) {
    state.errorMsg = e.message;
  }
};

const onResetClick = (): void => {
  state.tablature = "";
  state.result = "";
  state.pitch = -1;
  state.showResults = false;
};

const onResultsClick = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  target.select();
};
</script>

<template>
  <div class="d-flex card mt-3 p-3">
    <div
      v-show="state.errorMsg"
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      <strong>Error!</strong> {{ state.errorMsg }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
    <div class="flex-fill">
      <div class="mt-2">
        <textarea
          v-model="state.tablature"
          v-show="!state.showResults"
          class="form-control"
          rows="10"
          cols="30"
        />
      </div>
      <div>
        <textarea
          v-model="state.result"
          v-show="state.showResults"
          @click="onResultsClick"
          class="form-control"
          rows="10"
          cols="30"
          readonly
        />
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
