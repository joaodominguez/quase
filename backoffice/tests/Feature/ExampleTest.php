<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_backoffice_root_redirects_to_stays(): void
    {
        $response = $this->get('/');

        $response->assertRedirect('/stays');
    }
}
