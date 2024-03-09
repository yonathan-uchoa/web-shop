import mongoose from "mongoose";
import CounterSchema from "../schema/counter-schema.js";

const Counter = mongoose.model("counter", CounterSchema);

Counter.updateSeq = () => {
  return Counter.findOneAndUpdate(
    { id: "autoval" },
    { $inc: { seq: 1 } },
    { new: true }
  ).then((data) => {
    if (data) {
      return data.seq;
    } else {
      const _counter = new Counter({ id: "autoval", seq: 0 });
      _counter.save();
      return 0;
    }
  });
};

export default Counter;
