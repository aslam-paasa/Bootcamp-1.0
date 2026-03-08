"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* Step-3: Sending User Data Function */ 
async function addUser(userData) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
}

export function AddUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  /* Step-4: Sending User Data to Backend */ 
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setName("");
      setEmail("");
    },
  });

  /* Step-5: Attaching useMutation Hook */ 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      mutation.mutate({ name, email });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add User (useMutation Example)</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Step-6: Attaching useMutation to the form Button */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Adding..." : " Add User"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
