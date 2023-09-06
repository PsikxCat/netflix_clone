import { NextResponse } from 'next/server'
import { compare } from 'bcryptjs'

import connectToDB from '@database'
import Account from '@models/Account'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    await connectToDB()

    const { accountId, pin } = await request.json()

    const getCurrentAccount = await Account.findById(accountId)
    const checkPin = await compare(pin, getCurrentAccount.pin)

    if (!getCurrentAccount) {
      return NextResponse.json({
        success: false,
        message: 'Account not found',
      }, { status: 404 })
    } else if (!checkPin) {
      return NextResponse.json({
        success: false,
        message: 'Invalid pin',
      }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      message: 'Welcome back',
    }, { status: 200 })
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({
      success: false,
      body: { error },
      message: 'Something went wrong',
    }, { status: 500 })
  }
}
