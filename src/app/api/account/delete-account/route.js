import { NextResponse } from 'next/server'

import connectToDB from '@database'
import Account from '@models/Account'

export const dynamic = 'force-dynamic'

export async function DELETE(request) {
  try {
    await connectToDB()

    // Capturar el id de la cuenta a eliminar desde el query param
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Account id not found',
      }, { status: 404 })
    }

    // Eliminar la cuenta
    const deleteAccount = await Account.findByIdAndDelete(id)

    if (deleteAccount) {
      return NextResponse.json({
        success: true,
        body: { deleteAccount },
        message: 'Account deleted successfully',
      }, { status: 200 })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Account not found',
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
