import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import type { VueWrapper } from "@vue/test-utils";
import Transposer from "@/components/Transposer.vue";

let wrapper: VueWrapper<any>;

beforeEach(() => {
  wrapper = mount(Transposer);
});

describe("Transposer", () => {
  describe("Transpose button", () => {
    it("No tablature disables Transpose button", () => {
      expect(
        (wrapper.find("#transposeBtn").element as HTMLInputElement).disabled
      ).toBe(true);
    });

    it("Valid tablature enables Transpose button", async () => {
      await wrapper.find("#tablature").setValue("+4");
      expect(
        (wrapper.find("#transposeBtn").element as HTMLInputElement).disabled
      ).toBe(false);
    });

    it("Transposing a tablature should replace tablature with results", async () => {
      await wrapper.find("#tablature").setValue("+4");
      await wrapper.find("#transposeBtn").trigger("click");
      expect(wrapper.find("#tablature").isVisible()).toBe(false);
      expect(wrapper.find("#results").isVisible()).toBe(true);
    });

    it(`Transposing "+4" with pitch "-1" should result in "+1"`, async () => {
      await wrapper.find("#tablature").setValue("+4");
      await wrapper.find("#transposeBtn").trigger("click");
      expect(
        (wrapper.find("#results").element as HTMLTextAreaElement).value
      ).toBe("+1");
    });

    // it(`Transposing "+4" with pitch "1" should result in "+7"`, async () => {
    //   await wrapper.find("#tablature").setValue("+4");
    //   await wrapper.find("#transposeBtn").trigger("click");
    //   await wrapper.find("#increasePitch").setChecked();
    //   expect(
    //     (wrapper.find("#results").element as HTMLTextAreaElement).value
    //   ).toBe("+7");
    // });

    it(`Transposing "+3" with pitch "-1" should result show an error`, async () => {
      await wrapper.find("#tablature").setValue("+3");
      await wrapper.find("#transposeBtn").trigger("click");
      expect(wrapper.find("#errorAlert").isVisible()).toBe(true);
    });
  });
});
