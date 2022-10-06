import { Button, message } from 'antd'
import React, { useContext } from 'react'
import axios from 'axios'
import './style.css'
import { UserContext } from '../../contexts/user'

/**
 *
 * @param {String} src
 * @returns {Promise}
 */
const loadScript = async (src: any): Promise<any> => await new Promise((resolve) => {
  const script = document.createElement('script')
  script.src = src
  script.onload = () => {
    resolve(true)
  }
  script.onerror = () => {
    resolve(false)
  }
  document.body.appendChild(script)
})

const isDevEnvironment = document.domain === 'localhost'
/**
 *
 * @param {Number} amount
 * @param {String} applicationId
 * @param {String} email
 */

/**
 * Integrating Razorpay payment gateway via this Button. onClick=> will give a ready made UI pop-up.
 * @param {props} object --will have amount and application_id in it
 * @returns {Node} -- UI DIV
 */
interface paymentButtonPropType {
  amount: number
  applicationId: string
  setPaymentInfo: React.Dispatch<React.SetStateAction<{
    order_id: string
    payment_id: string
  }>>

}
export default function PaymentButton ({
  amount,
  applicationId,
  setPaymentInfo
}: paymentButtonPropType): JSX.Element {
  const { user } = useContext(UserContext)

  const UserMetaData = user.idToken.payload

  function getOrderId (amnt: number, appId: string, email: string): any {
    const data = JSON.stringify({
      amount: amnt * 100,
      id: `${appId}_${email}`
    })

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/payment`,
      headers: {
        Authorization: `Bearer ${user.idToken.jwtToken} `,
        'Content-Type': 'application/json'
      },
      data
    }

    axios(config)
      .then((response) => {
        sessionStorage.setItem('order_id', response.data.id)
        return response.data.id
      })
      .catch((err) => {
        message.error(err.message)
      })
  }

  async function displayRazorpay (): Promise<any> {
    const res = await loadScript(
      `${process.env.REACT_APP_RAZORPAY_SCRIPT_END_POINT}`
    )

    if (!res) {
      // Razorpay SDK failed to load.
      message.error('please check your internet connectivity.')
      return
    }
    // !order id is not getting saved in DB (but getting in RAZORPAY db)
    const odi = sessionStorage.getItem('order_id')
    const options = {
      key: isDevEnvironment ? `${process.env.REACT_APP_RAZORPAY_DEV_KEY}` : `${process.env.REACT_APP_RAZORPAY_DEV_KEY}`,
      currency: 'INR',
      amount: amount * 100,
      order_id: getOrderId(amount, applicationId, UserMetaData.email),
      description: 'Thank you for paying the Fees.You will hear from us soon !',
      handler (response: any) {
        // !DIsCUSS THIS

        setPaymentInfo({
          order_id: (odi ?? ''),
          payment_id: response.razorpay_payment_id
        })
        // console.log(props.PaymentInfo)
      },
      prefill: {
        email: UserMetaData !== null ? UserMetaData.email : '',
        contact:
          UserMetaData !== null
            ? parseInt(UserMetaData.phone_number.substring(3, 13), 10)
            : ''
      },
      readonly: {
        email: true,
        contact: true
      }
    }
    const paymentObject = new (window as any).Razorpay(options)
    paymentObject.open()
  }
  return (
    <div>
      <Button type="primary" onClick={() => { displayRazorpay() }}>
        Pay
        {' '}
        {amount}
      </Button>
    </div>
  )
}
