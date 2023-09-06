import { NextResponse } from 'next/server'

import connectToDB from '@database'
import Account from '@models/Account'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    await connectToDB()

    // Capturar el uid del perfil desde el query param
    const { searchParams } = new URL(request.url)
    const uid = searchParams.get('uid')

    // Capturar las cuentas asociadas al perfil
    const getAccounts = await Account.find({ uid })

    if (getAccounts) {
      return NextResponse.json({
        success: true,
        body: { userAccounts: getAccounts },
        message: 'Accounts retrieved successfully',
      }, { status: 200 })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Accounts not found',
      }, { status: 404 })
    }
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({
      success: false,
      body: { error },
      message: 'Something went wrong',
    })
  }
}
