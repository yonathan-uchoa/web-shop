import mongoose from "mongoose";
import CounterSchema from "../schema/counter-schema.js";

const Counter = mongoose.model("counter", CounterSchema);

Counter.updateSeq = (attr) => {
  return Counter.findOneAndUpdate(
    { id: "autoval" },
    { $inc: { [attr]: 1 } },
    { new: true, select: `${attr} -_id` }
  )
    .lean()
    .then((data) => {
      if (data) {
        return data;
      } else {
        const _counter = new Counter({ id: "autoval" });
        _counter.save();
        return { [attr]: 0 };
      }
    });
};

export default Counter;
