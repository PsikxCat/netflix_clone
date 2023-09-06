import { NextResponse } from 'next/server'
import { hash, genSalt } from 'bcryptjs'

import connectToDB from '@database'
import Account from '@models/Account'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    await connectToDB()

    const { name, pin, uid } = await request.json()

    // Validacion de datos
    if (!name || typeof name !== 'string' || !pin || typeof pin !== 'string' ||
      !uid || typeof uid !== 'string') {
      return NextResponse.json({
        success: false,
        message: 'Invalid input data',
      }, { status: 400 })
    }

    // Chequear si el nombre de la cuenta ya existe para el usuario actual
    const isAccountAlreadyExists = await Account.findOne({ uid, name })
    const allAccounts = await Account.find({ uid })

    // Si el nombre de la cuenta ya existe, devolver mensaje de error
    if (isAccountAlreadyExists) {
      return NextResponse.json({
        success: false,
        message: 'Account already exists, please try with another name',
      }, { status: 400 })
    }
    // Si ya existen cuatro cuentas, devolver mensaje de error
    if (allAccounts.length >= 4) {
      return NextResponse.json({
        success: false,
        message: 'You can only have four accounts',
      }, { status: 400 })
    }

    // Encriptar pin generando un salt unico para cada cuenta
    const salt = await genSalt(12)
    const hashPin = await hash(pin, salt)

    const newAccount = await Account.create({
      name,
      pin: hashPin,
      uid,
    })
    // Si la cuenta se creó correctamente, devolver mensaje de éxito
    if (newAccount) {
      return NextResponse.json({
        success: true,
        message: 'Account created successfully',
      }, { status: 201 })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Something went wrong',
      }, { status: 500 })
    }
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({
      success: false,
      body: { error },
      message: 'Something went wrong',
    }, { status: 500 })
  }
}
