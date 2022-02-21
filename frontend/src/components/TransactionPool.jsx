import { useEffect, useState } from "react";
import { API_BASE_URL, SECONDS_JS } from "../config";
import { Link } from "react-router-dom";
import Transaction from "./Transaction";
import { Button } from "react-bootstrap";
import history from "../history";

const POLL_INTERVALL = 10 * SECONDS_JS

function TransactionPool() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = () => {
    fetch(`${API_BASE_URL}/transactions`)
      .then(response => response.json())
      .then(json => {
        console.log('transactions json', json)

        setTransactions(json)
      })
  }

  useEffect(() => {
    fetchTransactions()
    const IntervalId = setInterval(fetchTransactions, POLL_INTERVALL)

    return () => {
      // to prevent memory leaks
      clearInterval(IntervalId)
    }
  }, []);


  const fetchMineBlock = () => {
   fetch(`${API_BASE_URL}/blockchain/mine`)
     .then(() => {
       alert('Success!')

       history.push('/blockchain')
     })
  }

  return (
    <div className="TransactionPool">
      <Link to='/'>Home</Link>
      <hr/>
      <h3>Transaction Pool</h3>
      <div>
        {transactions.map(transaction => (
          <div key={transaction.id}>
            <hr/>
            <Transaction transaction={transaction} />
          </div>
        ))}
      </div>
      <hr/>
      <Button
        variant="danger"
        onClick={fetchMineBlock}
      >
        Mine a block of these transactions
      </Button>
    </div>
  )
}

export default TransactionPool;
