'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createProject } from './actions'

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    try {
      await createProject(formData)
      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-2 border-black rounded-none font-code font-bold text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-secondary transition-all">
          <Plus className="w-4 h-4 mr-2" />
          NEW_PROJECT
        </Button>
      </DialogTrigger>
      <DialogContent className="border-4 border-black rounded-none bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md">
        <DialogHeader>
          <DialogTitle className="font-code font-bold text-2xl uppercase tracking-tighter">Initialize Project</DialogTitle>
          <DialogDescription className="font-medium text-black/60">
            Define a new tracking vector for your cognitive architecture.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="font-code text-[10px] font-bold uppercase opacity-50">Project Title</Label>
            <Input 
              id="title" 
              name="title" 
              placeholder="e.g. CCNA Mastery" 
              required 
              className="border-2 border-black rounded-none focus:ring-0 focus:border-black placeholder:opacity-30 font-bold"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="font-code text-[10px] font-bold uppercase opacity-50">Directives</Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder="What is the objective of this project?" 
              className="border-2 border-black rounded-none focus:ring-0 focus:border-black placeholder:opacity-30 min-h-[100px] font-bold"
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none h-14 font-code font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all"
          >
            {loading ? 'INITIALIZING...' : 'CREATE_PROJECT'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
