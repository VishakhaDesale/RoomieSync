import { useState } from "react";
import axios from "axios";
import Notification from "./Notification";

const Expenses = () => {
  let userId = localStorage.getItem("user");
  if (userId) {
    // Remove any unnecessary spaces and extra quotes ("" symbols)
    userId = userId
      .replace(/\s+/g, "") // Removes all whitespace (including extra spaces)
      .replace(/"+/g, ""); // Removes extra double quotes ("")
  }

  const [amount, setAmount] = useState("");
  const [payerId, setPayerId] = useState("");
  const [requesterId, setRequesterId] = useState("");
  const [expenseId, setExpenseId] = useState("");
  const [expenseStatus, setExpenseStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log(userId);

  // Request Payment
  const requestPayment = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8080/expenses/requestPayment",
        {
          requesterId: userId,
          payerId,
          amount,
          status: "PENDING",
        }
      );
      console.log(response);
      setRequesterId(requesterId);
      setExpenseId(response.data.id);
      setExpenseStatus(response.data.status);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Error requesting payment.");
    }
  };

  console.log();

  // Approve Payment
  const approvePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8080/expenses/approvePayment/${expenseId}`
      );
      setExpenseStatus(response.data.status);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Error approving payment.");
    }
  };

  // Confirm Payment
  const confirmPayment = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8080/expenses/confirmPayment/${expenseId}`
      );
      setExpenseStatus(response.data.status);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Error confirming payment.");
    }
  };

  // Reject Payment
  const rejectPayment = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8080/expenses/rejectPayment/${expenseId}`
      );
      setExpenseStatus(response.data.status);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Error rejecting payment.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-28 h-[80vh] mb-2">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Expense Management
      </h2>

      {/* Error Message */}
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

      {/* Request Payment Section */}
      <div className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="amount" className="font-medium text-gray-700">
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="payerId" className="font-medium text-gray-700">
            Payer ID:
          </label>
          <input
            type="text"
            id="payerId"
            value={payerId}
            onChange={(e) => setPayerId(e.target.value)}
            placeholder="Enter payer ID"
            className="mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="text-center">
          <button
            onClick={requestPayment}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
            disabled={loading}
          >
            {loading ? "Processing..." : "Request Payment"}
          </button>
        </div>
      </div>

      {/* Expense Status and Actions */}
      {expenseId && (
        <div className="mt-6 p-4 border-t border-gray-300">
          <p className="text-lg font-medium">Expense ID: {expenseId}</p>
          <p className="text-sm text-gray-500">
            Status:{" "}
            <span
              className={`font-semibold ${
                expenseStatus === "PENDING"
                  ? "text-yellow-500"
                  : expenseStatus === "APPROVED"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {expenseStatus}
            </span>
          </p>

          <div className="flex justify-between mt-4">
            <button
              onClick={approvePayment}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300"
              disabled={userId !== requesterId && expenseStatus !== "PENDING" || loading}
            >
              Approve Payment
            </button>
            <button
              onClick={confirmPayment}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
              disabled={userId !== payerId && expenseStatus !== "APPROVED" || loading}
            >
              Confirm Payment
            </button>
            <button
              onClick={rejectPayment}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-300"
              disabled={expenseStatus !== "PENDING" || loading}
            >
              Reject Payment
            </button>
          </div>
        </div>
      )}

      {/* Notification Component */}
      <Notification userId={userId} />
    </div>
  );
};

export default Expenses;
