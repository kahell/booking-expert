<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\NexmoMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class UserLoginPassCode extends Notification
{
    use Queueable;

    private $sms_code;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($sms_code)
    {
        $this->sms_code = $sms_code;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['nexmo'];
    }

    /**
     * Get the Nexmo / SMS representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return NexmoMessage
     */
    public function toNexmo($notifiable)
    {
        return (new NexmoMessage)
            ->content('This is your secret password for LOGIN. ' . strtoupper(env('APP_NAME')) . ' never asks for your password, DO NOT GIVE IT TO ANYONE. Your PASSWORD is ' . $this->sms_code . ' .')
            ->unicode();
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
