<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class StudentWelcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $student;
    public $rawPassword;

    public function __construct($student, $rawPassword)
    {
        $this->student = $student;
        $this->rawPassword = $rawPassword;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Welcome to EdTech',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.student_welcome',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}