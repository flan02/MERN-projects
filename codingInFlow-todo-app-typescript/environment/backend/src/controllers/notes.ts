import { RequestHandler } from "express";
import noteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";

export const getNotes: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId

    try {
        //throw createHttpError(401) //! Para probar el error handler
        assertIsDefined(authenticatedUserId)
        const notes = await noteModel.find({ userId: authenticatedUserId }).exec();
        res.status(200).json(notes)
    } catch (error) {
        next(error)
    }
}

export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId
    const authenticatedUserId = req.session.userId
    try {
        assertIsDefined(authenticatedUserId)
        if (!mongoose.isValidObjectId(noteId)) throw createHttpError(400, "Invalid note id")
        const note = await noteModel.findById(noteId).exec()
        if (!note) throw createHttpError(404, "Note not found.")
        if (!note.userId.equals(authenticatedUserId)) throw createHttpError(401, "You cannot access this note.")
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
}

//* Cuando sabemos los tipos de datos qe esperamos.
interface CreateNoteBody {
    title?: string,
    text?: string
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title
    const text = req.body.text
    const authenticatedUserId = req.session.userId
    try {
        assertIsDefined(authenticatedUserId)
        if (!title) throw createHttpError(400, "Note must have a title.")

        const newNote = await noteModel.create({
            userId: authenticatedUserId, //? El usuario qe esta logueado
            title: title,
            text: text
        })
        res.status(201).json(newNote) //recurso creado!
    } catch (error) {
        next(error)
    }
}

interface UpdateNoteParams {
    noteId: string
}

interface UpdateNoteBody {
    title?: string,
    text?: string
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId
    const newTitle = req.body.title
    const newText = req.body.text
    const authenticatedUserId = req.session.userId

    try {
        assertIsDefined(authenticatedUserId)
        if (!mongoose.isValidObjectId(noteId)) throw createHttpError(400, "Invalid note id")
        if (!newTitle) throw createHttpError(400, "Note must have a title.")
        const note = await noteModel.findById(noteId).exec()
        //* const note = await noteModel.findByIdAndUpdate(noteId).exec()  OTRA FORMA DE ACTUALIZAR
        if (!note) throw createHttpError(404, "Note not found.")
        if (!note.userId.equals(authenticatedUserId)) throw createHttpError(401, "You cannot access this note.")
        note.title = newTitle
        note.text = newText
        const updatedNote = await note.save()
        res.status(200).json(updatedNote)
    } catch (error) {
        next(error)
    }
}

export const deleteNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId
    const authenticatedUserId = req.session.userId
    try {
        assertIsDefined(authenticatedUserId)
        if (!mongoose.isValidObjectId(noteId)) throw createHttpError(400, "Invalid note id")
        const note = await noteModel.findById(noteId).exec()
        if (!note) throw createHttpError(404, "Note not found.")
        if (!note.userId.equals(authenticatedUserId)) throw createHttpError(401, "You cannot access this note.")
        await note.deleteOne()
        res.sendStatus(204) // deleted successfully
    } catch (error) {
        next(error)
    }
}